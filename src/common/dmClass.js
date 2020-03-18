const MAX_CHANEL = 10;
class dmClass {
    constructor({
        speed = 8,
        wrapper,
        dm
    }) {
        this.dm = dm.slice(); //弹幕
        this.wrapper = wrapper; //父容器，展示弹幕的div
        this.speed = speed;
        this.domObjectArray = [];
        this.hasLock = new Array(MAX_CHANEL).fill(false);
        this.currentDm = new Array(MAX_CHANEL);
        this.dmIndex = 0;
        this.data = new Array();
        for (let i = 0; i < 10; i++) {
            this.currentDm[i] = new Array();
        }
    }
    updataDm(time) {
        console.log(this.dmIndex)
        while (this.dm[this.dmIndex].time < time) {
            this.dmIndex += 1;
            if (this.dm.length <= this.dmIndex) {
                this.dmIndex = 0;
                return;
            }
        }
        for (let i = this.dm[this.dmIndex].time; time <= i && i < time + 0.5 && this.dmIndex < this.dm.length; this.dmIndex++) {
            this.data.push(this.dm[this.dmIndex].data);
            i = this.dm[this.dmIndex].time;
            //console.log(i);
        }
        if (this.data.length) {
            this.fillDm(this.data);
        }
        //console.log(this.dm);
        //console.log(this.currentDm);
        //console.log(this.currentDm);
    }
    initDom(i, callback) {
        let dom = document.createElement('div');
        dom.innerText = "heihei";
        dom.style.cssText = `
        position: absolute;
        top: ${i * 30}px;
        right:0;
        white-space: nowrap;
        user-select: none;
        color: #fff;
        transform: translateX(0px);
        transition: transform ${this.speed}s linear 0s;
    `;
        let domObj = {
            dom: dom,
            startTime: new Date().getTime(),
            suspend: new Date().getTime(),
            runningTime: 0,
            chanal: i
        }
        dom.addEventListener('transitionend', () => {
            dom.style.transition = `none`;
            dom.style.transform = `translateX(0px)`;
            this.domObjectArray.push(domObj);
            this.currentDm[i].shift();
            this.hasLock[i] = false;
        })
        this.wrapper.appendChild(dom);
        callback(domObj);
        return domObj;
    }
    fillDm(dataArray) {
        //console.log(dataArray[0]);
        while (this.domObjectArray.length && dataArray.length) {
            let domObject = this.domObjectArray.shift();
            let dom = domObject.dom;
            let data = dataArray.shift();
            dom.innerText = data;
            let domWidth = dom.offsetWidth;
            dom.style.right = `-${domWidth}px`;
            dom.style.transition = `transform ${this.speed}s linear`;
            dom.style.transform = `translateX(-${this.wrapper.clientWidth}px)`;
            domObject.startTime = new Date().getTime(),
                domObject.suspend = new Date().getTime();
            domObject.runningTime = 0;
            this.currentDm[domObject.chanal].push(domObject);
        }
        while (dataArray.length) {
            let i = this.getChanal();
            let domObject = this.initDom(i, (dom) => {
                let setms = setInterval(() => {
                    domObject.dom.style.transform = `translateX(-${this.wrapper.clientWidth}px)`;
                    clearInterval(setms);
                }, 1);
                //console.log(dom)
            });
            //console.log(dom);
            let data = dataArray.shift();
            domObject.dom.innerText = data;
            let domWidth = domObject.dom.offsetWidth;
            domObject.dom.style.right = `-${domWidth}px`;
            this.currentDm[i].push(domObject);
            //;
        }
    }
    getChanal() {
        //console.log(this.hasLock[0]);
        for (let i = 0; i < MAX_CHANEL; i++) {
            if (!this.hasLock[i] && this.currentDm[i].length < 4) {
                this.hasLock[i] = true;
                return i;
            } else {
                this.hasLock[i] = true;
            }
        }
        for (let i = 0; i < MAX_CHANEL; i++) {
            if (this.currentDm[i].length < 4) {
                this.hasLock[i] = false;
                return i;
            }
        }

    }
    dmPause() {
        for (let i = 0; i < MAX_CHANEL; i++) {
            for (let j = 0; j < this.currentDm[i].length; j++) {
                let dom = this.currentDm[i][j].dom;
                this.currentDm[i][j].suspend = new Date().getTime();
                let { top, left } = getComputedStyle(dom);
                let offsetTime = this.currentDm[i][j].suspend - this.currentDm[i][j].startTime;
                this.currentDm[i][j].runningTime += offsetTime;
                let offsetPercent = ((this.currentDm[i][j].runningTime / 1000) / this.speed).toFixed(3);
                let offsetX = offsetPercent * (left.replace(/px/, ""));
                dom.style.transition = `none`;
                dom.style.transform = `translateX(-${offsetX}px`;
            }
        }
    }
    dmPlay() {
        for (let i = 0; i < MAX_CHANEL; i++) {
            for (let j = 0; j < this.currentDm[i].length; j++) {
                let dom = this.currentDm[i][j].dom;
                dom.style.transition = `transform ${this.speed - (this.currentDm[i][j].runningTime) / 1000}s linear`;
                dom.style.transform = `translateX(-${this.wrapper.clientWidth}px`;
                this.currentDm[i][j].startTime = new Date().getTime();
            }
        }
    }
    cleanDm() {
        let childs = this.wrapper.childNodes;
        while (childs.length) {
            this.wrapper.removeChild(childs[0]);
        }
    }
    reset() {
        this.cleanDm();
        this.domObjectArray = [];
        this.hasLock = new Array(MAX_CHANEL).fill(false);
        this.currentDm = new Array(MAX_CHANEL);
        this.dmIndex = 0;
        this.data = new Array();
        for (let i = 0; i < 10; i++) {
            this.currentDm[i] = new Array();
        }
    }
}
export default dmClass;