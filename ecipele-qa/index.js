describe('E-cipele', () => {

    /*
    Testovi su sljedeći:

    1)  Učitaj web stranicu E-cipele i klikni Prihvaćam uvjete
    2)  Klikni na Prijavi se
    3)  Login sa netočnim podacima
    4)  Login sa točnim podacima
    5)  Učitavanje Košarice na e-cipele 
    */
    
        it('Open ecipele', async () => {
            browser.url('https://www.ecipele.hr/');

            const permissionButton = await $('[data-testid="permission-popup-accept"]');
            await permissionButton.click();
        });

        it('Prijava', async () => {
            browser.url('https://www.ecipele.hr/customer/account/login/');
            const zaboravljenaLoz = await $('.account-login__forgot');
            await expect(zaboravljenaLoz).toHaveText ('zaboravili ste lozinku?');
        });

        it('Login with INCORRECT credentials', async () => {
            browser.url('https://www.ecipele.hr/customer/account/login/');
    
            // DEFINIRANJE KORIŠTENIH ELEMENATA
            const usernameInput = await $('[data-testid="login-input-email"]');
            const passwordInput = await $('[data-testid="login-input-password"]');
            const loginButton = await $('[data-testid="login-submit-button"]');
           
            
    
            // UPIS KRIVIH PRISTUPNIH PODATAKA
            await usernameInput.addValue('lfadjkf@klhrjfhl.com');
            await passwordInput.addValue('mxcbrfhha');
    
            // KLIK NA LOG IN DUGME
            await loginButton.click();
    
            // ODGODA DA MOŽEMO PRATITI KAKO RADI
            //await browser.pause(3000);
    
            // OČEKIVANA ERROR PORUKA NAKON KRIVOG UNOSA
            const errorMessage = await $('.error-msg');
            await expect(errorMessage).toHaveText ('Nevažeća prijava ili lozinka');
        });
    
       it('Login with CORRECT credentials', async () => {
            browser.url('https://www.ecipele.hr/customer/account/login/');
    
    
            const usernameInput = await $('[data-testid="login-input-email"]');
            const passwordInput = await $('[data-testid="login-input-password"]');
            const loginButton = await $('[data-testid="login-submit-button"]');
    
            await usernameInput.addValue('myemail@gmail.com');
            await passwordInput.addValue('notreallymypassword');
    
            await loginButton.click();      
    
            //await browser.pause(3000);
    
            // OČEKIVANA PORUKA NAKON TOČNOG UNOSA
            const h1 = await $('h1');
            await expect(h1).toHaveText ('Dobrodošli, Tena!');
        });
    
        // KLIK NA KOŠARICU
        it('Open cart on ecipele', async () => {
            browser.url('https://www.ecipele.hr/checkout/cart/');

            const h1 = await $('h1');
            await expect(h1).toHaveText ('Košarica je prazna');
        });
    })
    

