/*
初始化通道（chanel），初始化弹幕池dmPool，建立弹幕缓存区
*/
const MAX_CHANEL_COUNT = 10;
const MAX_CHANEL = 6;

class dmClass {
    constructor({
        speed = 8,
        wrapper,
        dmPool
    }) {
        //弹幕池，用于存储所有弹幕
        this.dmPool = dmPool;
        //dom池
        this.dmBuff = [];
        //即将发送的弹幕
        this.domShootWill = [];
        //通道是否空闲
        this.hasPositin = [];
        //弹幕发送速率
        this.speed = speed;
        //弹幕的父容器
        this.wrapper = wrapper;
        //暂停
        this.pause = false;
        //正在发送的弹幕
        this.shootNow = {
            doms: [],
            time: []
        };
    }
    //初始化dom对象
    initDom(i) {
        let dom = document.createElement('div');
        dom.style.cssText = `
            position: absolute;
            top: ${i * 30}px;
            right:0;
            white-space: nowrap;
            user-select: none;
            color: #fff;
        `;
        dom.play = function () { };
        return dom;
    }
    //初始化弹幕缓冲区，利用transitionend实现dom对象的复用
    initDmBuff() {
        for (let i = 0; i < MAX_CHANEL; i++) {
            let doms = [];
            for (let j = 0; j < MAX_CHANEL_COUNT; j++) {
                let dom = this.initDom(i);
                this.wrapper.appendChild(dom);
                doms.push(dom);
                dom.addEventListener('transitionend', () => {
                    dom.style.cssText = `
                    position: absolute;
                    top: ${i * 30}px;
                    right:0;
                    white-space: nowrap;
                    user-select: none;
                    color: #fff;
                    `;
                    this.dmBuff[i].push(dom);
                    this.shootNow.doms.shift();
                    this.shootNow.time.shift();
                })
            }
            this.dmBuff[i] = doms;
            this.hasPositin[i] = true;
            //console.log(this.wrapper);
        }
    }
    //将弹幕以时间为组来发送
    intervalInsert(time) {
        //let chanel = this.getChanel();
        //console.log(this.dmPool);
        if (this.dmPool.length) {
            let flag = true;
            while (this.dmPool.length && flag) {
                if(this.dmPool[0].time + 1 < time){
                    this.dmPool.shift();
                    continue;
                }
                if (this.dmPool[0].time <= time && this.dmPool[0].time >= time - 1) flag = false;
                if (!flag) this.domShootWill.push(this.dmPool.shift());
                //console.log(this.dmPool)
                flag = !flag;
            }
        }
        if (this.domShootWill.length) this.shootDm();
        return -1;
    }
    shootDm() {
        if (!this.pause) {
            let mar_left = 0;
            while (this.domShootWill.length) {
                let position = this.getChanel();
                if (position != -1) {
                    let dom = this.dmBuff[position].shift();
                    dom.innerText = this.domShootWill[0].data;
                    //console.log(doms);
                    dom.style.transition = `transform 8s linear`;
                    dom.style.transform = `translateX(-${this.wrapper.clientWidth}px)`;
                    dom.style.right = `-${mar_left}px`;
                    this.shootNow.doms.push(dom);
                    this.shootNow.time.push(this.domShootWill[0].time);
                    this.domShootWill.shift();
                    if (position < MAX_CHANEL && !this.hasPositin[position + 1])
                        this.hasPositin[position + 1] = true;
                    if (position === MAX_CHANEL - 1) {
                        mar_left = mar_left + dom.getBoundingClientRect().width + 10;
                        //console.log(dom.getBoundingClientRect());
                        this.hasPositin[0] = true;
                    }
                }
            }
        }
    }
    getChanel() {
        for (let i = 0; i < MAX_CHANEL; i++) {
            if (this.hasPositin[i] && this.dmBuff[i].length) {
                this.hasPositin[i] = false;
                return i;
            }
        }
        return -1;
    }
    dmPause(pauseTime) {
        this.pause = true;
        if (this.shootNow.doms) {
            let dom;
            let left;
            let top;
            let domWidth;
            let time;
            for (let i = 0; i < this.shootNow.doms.length; i++) {
                /**/
                dom = this.shootNow.doms[i];
                time = this.shootNow.time[i];
                domWidth = dom.clientWidth;
                //算出弹幕已走的位移
                left = ((pauseTime - time) / this.speed) * this.wrapper.clientWidth;
                top = dom.offsetTop;
                dom.style.cssText = `                    
                position: absolute;
                top: ${top}px;
                right:0;
                white-space: nowrap;
                user-select: none;
                color: #fff;
                transition: transform 0s linear;
                transform: translateX(-${left + 10}px);
                `
            }
        }
    }
    dmPlay(pauseTime) {
        this.pause = false;
        if (this.shootNow.doms.length) {
            let speedRest;
            for (let i = 0; i < this.shootNow.doms.length; i++) {
                let dom = this.shootNow.doms[i];
                speedRest = this.speed - (pauseTime - this.shootNow.time[i]);
                dom.style.transition = `transform ${speedRest}s linear`;
                dom.style.transform = `translateX(-${this.wrapper.clientWidth}px)`;
            }
        }
    }
    clearDm() {
        if (this.shootNow.doms.length) {
            while (this.shootNow.doms.length) {
                let dom = this.shootNow.doms.shift();
                this.shootNow.time.shift();
                for (let i = 0; i < MAX_CHANEL; i++) {
                    if (this.dmBuff[i].length < MAX_CHANEL_COUNT) {
                        this.hasPositin[i] = true;
                        this.dmBuff[i].push(dom);
                        break;
                    }
                }
                dom.style.cssText = `
                position: absolute;
                top: 0px;
                right:0;
                white-space: nowrap;
                user-select: none;
                color: #fff;
                `;
            }
        }
    }
}
export default dmClass;