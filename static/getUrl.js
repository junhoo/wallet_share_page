import qs from 'qs'
export let searchParams = qs.parse(location.search.replace('?', ''))
export { searchParams as default }