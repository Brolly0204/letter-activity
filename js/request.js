function Request() {}

// let keyStr = 'syrjiacmsinterfa'
// // 加密
// function encrypt(word) { 
// 	keyStr = keyStr || 'abcdefgabcdefg12'
// 	var key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
// 	var srcs = CryptoJS.enc.Utf8.parse(word)
// 	var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode:CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
// 	return encrypted.toString()
// }

;(function() {
  function post(url, data) {
    return axios.post(url, {
      dataJson: encrypt(JSON.stringify(data)) // 数据加密
    })
  }
  function get(url, params) {
    return axios.get(url, {
      params: params
    }).then(function (res) {
      return res.data
    })
  }

  Request.post = post
  Request.get = get
})()
