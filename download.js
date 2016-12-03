const Nightmare = require('nightmare')
const exec = require('child_process').exec
const nightmare = Nightmare({ show: false })

nightmare
  .goto('https://moneyforward.com/users/sign_in')
  .insert('#sign_in_session_service_email', process.argv[2])
  .insert('#sign_in_session_service_password', process.argv[3])
  .click('#login-btn-sumit')
  .wait('#header-container > header > div.global-menu > ul > li:nth-child(2) > a')
  .click('#header-container > header > div.global-menu > ul > li:nth-child(2) > a')
  .cookies.get()
  .end()
  .then(function(cookies) {
    const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}; `).join(' ')
    const command = `curl -O -H "Cookie: ${cookieString}" https://moneyforward.com/cf/csv?from=2016%2F11%2F01&month=11&year=2016`
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
      } else {
        console.log(stdout)
      }
    })
  })
  .catch((error) => error && console.error(error))
