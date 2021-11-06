import React, { Component } from 'react'
/**
 * ImitateSuspense 实际上就是依赖 componentDidCatch 实现的，原理：
 *
 * 无论是什么异常，JavaScript都能捕获，React就是利用了这个语言特性，捕获了所有生命周期函数，
 * render函数，以及事件回调中的任何错误，封装进一个特殊的生命周期里：componentDidCatch
 *
 * 基本方式如下：
 * */

let cached = {}

/**
 * createFetcher 高阶函数，利用闭包缓存变量 ref，在返回的函数中，进行then操作，将得到的结果设置给缓存ref
 *
 * */
export const createFetcher = (promiseTask) => {
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then(res => {
      console.log('task.then:', res)
      ref = res // 保存结果
    })

    // 函数第一次调用的时候，必定抛出一个 task(Promise)
    if (ref === cached) {
      throw task; // 抛出 Promise，在 ImitateSuspense 中获取并调用
    }

    return ref;
  }
}

// 模拟 ImitateSuspense
export default class ImitateSuspense extends Component {
  state = {
    isLoading: false,
  }

  static getDerivedStateFromError(error){
    console.error('getDerivedStateFromError:', error)
  }

  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch:', error, errorInfo)
    if (this._mounted) {
      if (typeof error.then === 'function') {
        this.setState({
          isLoading: true,
        })

        error.then(() =>{
          if (this._mounted) {
            this.setState({
              isLoading: false,
            })
          }
        })
      }
    }
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    console.log('_mounted：', this._mounted)
    this._mounted = false;
  }

  render () {
    const { children, fallback } = this.props;
    const { isLoading } = this.state;

    return children;
  }
}
