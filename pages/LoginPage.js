class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInbutton= page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    
    }
    
    async goTo()
    {
      await this.page.goto('client/#/auth/login', { waitUntil: 'domcontentloaded' });
      await this.page.waitForURL('**/client**');

  }

    
    async validLogin(username,password)
    {
         await this.userName.fill(username);
         await this.password.fill(password);
         await this.signInbutton.click();
         await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    
    }
    
    }
    module.exports = {LoginPage};