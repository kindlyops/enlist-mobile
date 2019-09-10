function search(routes, activeRoute) {
  if (!routes || !activeRoute) return

  let found = false
  let i = 0

  while (i <= routes.length - 1) {
    let route = routes[i]
    if (!route) return

    if (route.name === activeRoute) {
      found = true
      break
    }

    if (route.nested) {
      if (search(route.nested, activeRoute)) {
        found = true
        break
      }
    }

    i = i + 1
  }

  return found
}

function activeRouteName(routing) {
  let { routes } = routing
  let routeName = routes[routes.length - 1]

  if (!routeName) {
    routeName = 'notifications'
  }

  return routeName
}

function activeTree(routes, activeRoute, tree = []) {
  if (!routes || !activeRoute) return
  let i = 0

  if (!search(routes, activeRoute)) {
    console.warn('Nothing matched the given route')
    return tree
  }

  while (i <= routes.length - 1) {
    route = routes[i]
    if (!route) return

    if (route.name === activeRoute) {
      tree.push(route)
      break
    }

    if (!route.nested || !search(route.nested, activeRoute)) {
      i++
    } else {
      tree.push(route)
      tree = activeTree(route.nested, activeRoute, tree)
      break
    }
  }

  return tree
}

module.exports = {
  activeTree: activeTree,
  activeRouteName: activeRouteName
}
