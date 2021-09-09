import axios from 'axios'

axios.defaults.baseURL = 'https://vue-test-api.wsscabbottabad.org/public/api'

axios.defaults.headers['Accept'] = 'application/json'
 
export default axios