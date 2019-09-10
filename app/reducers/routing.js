import routes from '../routes'
import { activeTree } from '../utils/routerUtils'
import { filter, head } from 'lodash'

const initialState = {
  routes: ['notifications'],

  previousRoute: null,
  props: {}
}

const flattenRoutes = (routes, flat = []) => {
  routes.forEach(route => {
    flat.push(route)
    if (route.nested) flattenRoutes(route.nested, flat)
  })

  return flat
}

const flattenedRoutes = flattenRoutes(routes)

const findRoute = routeName => {
  return head(
    filter(flattenedRoutes, route => {
      return route.name === routeName
    })
  )
}

export default function(state = initialState, action = {}) {
  let routeIndex, change, actualRoute
  let { routes, previousRoute } = state

  switch (action.type) {
    case 'goTo':
      let { route, props } = action
      let stack = [route]

      actualRoute = findRoute(route)

      if (!actualRoute) {
        return state
      }

      while (actualRoute.nested) {
        let next = head(filter(actualRoute.nested, route => route.isDefault))

        if (!next) {
          console.warn(
            '[routing] Component has nested components, but none of them is set as default'
          )
          return
        }

        stack.push(next.name)
        actualRoute = next
      }

      return {
        ...state,
        previousRoute: action.previousRoute || previousRoute,
        routes: [...state.routes, ...stack],
        props: { ...state.props, ...props }
      }

    case 'goBack':
      /**
       * In case there's only one route, we don't
       * want to remove it from the stack.
      */

      if (routes && routes.length === 1) {
        return state
      } else {
        actualRoute = findRoute(routes[routes.length - 1])

        /**
         * If the actual route is the default route, we want
         * to go back to the parent, so we remove the last
         * two off the stack.
        */

        if (actualRoute.isDefault) {
          return {
            ...state,
            routes: routes.slice(0, routes.length - 2)
          }
        } else {
          return {
            ...state,
            routes: routes.slice(0, routes.length - 1)
          }
        }
      }

    case 'goBackToPreviousRoute':
      routes.forEach((route, index) => {
        if (route === previousRoute) {
          routeIndex = index
        }
      })

      return {
        ...state,
        routes: routes.slice(0, routeIndex + 1)
      }

    default:
      return state
  }
}
