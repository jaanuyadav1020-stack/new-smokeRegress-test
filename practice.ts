
class LoginPage {
    username: string;

    constructor(username: string) {
        this.username = username;
    }

    async login(): Promise<void> {
        console.log(`Login started for user: ${this.username}`);

        // Fake delay of 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Login successful!");
    }
}

async function main() {
    const page = new LoginPage("jaan");

    await page.login();

    console.log("Test completed.");
}

main();
