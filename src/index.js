import Rx from 'rx';

function main(sources){
  const click$ = sources.DOM

  return {
   DOM:click$
      .startWith(null)
      .flatMapLatest(() => {
        return Rx.Observable.timer(0, 1000)
          .map(i => `Seconds elapsed ${i}`)})
      }
}

function DOMDriver(text$){
  text$.subscribe(text => {
    const container = document.querySelector('#app');
    container.textContent = text;
  });

  const DOMSource = Rx.Observable.fromEvent(document, 'click')
  return DOMSource
}

function run(mainFn){
  const proxySources = {}
  Object.keys(drivers()).forEach(driver => {
    proxySources[driver] = new Rx.Subject()
  })
  const proxyDOMSource = new Rx.Subject()
  const sinks = mainFn({DOM: proxyDOMSource})
  const DOMSource = DOMDriver(sinks.DOM)
  DOMSource.subscribe(click => proxyDOMSource.onNext(click))
}

function drivers(){
  return {
    DOMDriver : DOM
  }
}

run(main)



// var refreshButton = document.querySelector('.refresh')
// var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click')
// var requestStream = refreshClickStream.startWith('startup click')
//                       .map(() => {
//                         var randomOffset = Math.floor(Math.random()*500)
//                         return `https://api.github.com/users?since=${randomOffset}`
//                       })
//
// var responseStream = requestStream.flatMap(requestUrl => Rx.Observable.fromPromise(fetch(requestUrl)))
