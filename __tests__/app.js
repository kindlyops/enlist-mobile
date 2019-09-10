import { expect } from 'chai'
import routing from '../app/reducers/routing'

describe('Routing', () => {
  test('should have the right initial state', () => {
    expect(routing(undefined, {})).to.eql({
      routes: ['notifications'],
      previousRoute: null,
      props: {}
    })
  })
})

describe('Going to the next route', () => {
  describe('when the route is valid', () => {
    describe('and the route has children', () => {
      test('should append the next route AND its default child to the array', () => {
        const { routes } = routing(undefined, {
          type: 'goTo',
          route: 'jobs'
        })

        expect(routes[routes.length - 2]).to.equal('jobs')
        expect(routes[routes.length - 1]).to.equal('jobslist')
      })
    })

    describe('and the route has no children', () => {
      test('should append the next route to the array', () => {
        const { routes } = routing(undefined, {
          type: 'goTo',
          route: 'settings'
        })

        expect(routes[routes.length - 1]).to.equal('settings')
      })
    })

    describe('and some props are provided', () => {
      test('should add the props to the propsStack', () => {
        const { props } = routing(undefined, {
          type: 'goTo',
          route: 'job',
          props: {
            jobId: 1
          }
        })

        expect(props).to.have.property('jobId')
        expect(props.jobId).to.eq(1)
      })
    })

    describe('and a previous route is provided', () => {
      test('it should set the previous route property', () => {
        const { previousRoute } = routing(undefined, {
          type: 'goTo',
          route: 'job',
          previousRoute: 'settings'
        })

        expect(previousRoute).to.equal('settings')
      })
    })
  })

  describe('when the route is invalid', () => {
    test('should do nothing', () => {
      const nextState = routing(undefined, {
        type: 'goTo',
        route: 'some-invalid-route'
      })

      expect(nextState.routes).not.to.include('some-invalid-route')
    })
  })
})

describe('Going back', () => {
  test('should not do anything if there is only 1 route', () => {
    const { routes } = routing(undefined, {
      type: 'goBack'
    })

    expect(routes).to.have.length(1)
  })

  describe('when there is more than one route', () => {
    describe('when the current route is the default child', () => {
      test('should go back to the previous major route', () => {
        const nextState = routing(undefined, {
          type: 'goTo',
          route: 'jobs'
        })

        const { routes } = routing(nextState, {
          type: 'goBack'
        })

        expect(routes).to.have.length(1)
      })
    })

    describe('when the current route is not the default child', () => {
      test('should go back to the previous route', () => {
        let nextState = routing(undefined, {
          type: 'goTo',
          route: 'application'
        })

        nextState = routing(nextState, {
          type: 'goTo',
          route: 'threads'
        })

        const { routes } = routing(nextState, {
          type: 'goBack'
        })

        expect(routes).to.have.length(3)
        expect(routes).to.include('notifications')
        expect(routes).to.include('application')
        expect(routes).to.include('overview')
      })
    })
  })
})

describe('Going back to the previous marked route', () => {
  test('should work fine', () => {
    let nextState = routing(undefined, {
      type: 'goTo',
      route: 'application'
    })

    nextState = routing(nextState, {
      type: 'goTo',
      route: 'threads',
      previousRoute: 'application'
    })

    const { routes } = routing(nextState, {
      type: 'goBackToPreviousRoute'
    })

    expect(routes).to.have.length(2)
    expect(routes).to.include('notifications')
    expect(routes).to.include('application')
  })
})
