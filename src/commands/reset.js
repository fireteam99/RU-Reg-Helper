const storage = require('node-persist');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const path = require('path');

module.exports = async () => {
    try {
        // confirm the user wants to reset their config
        const answer = await prompt([
            {
                type: 'confirm',
                name: 'continue',
                message:
                    'This will remove all of your current configurations. Would like to continue?',
            },
        ]);
        if (!answer) {
            console.log(chalk.red('Exiting...'));
        } else {
            // read in config from node persist
            await storage.init({ dir: path.join(__dirname, '..', 'storage') });
            await storage.clear();
            console.log(chalk.green('Successfully reset configurations'));
        }
    } catch (err) {
        console.log(err);
    }
};