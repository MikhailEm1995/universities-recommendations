const fs = require('fs');
const path = require('path');
const { capitalize } = require('./utils');

const projects = [
    'universities',
    'auth',
    'admin',
    'public',
];

const files = [
    'module',
    'entity',
    'service',
    'controller',
    'types',
];

module.exports = (plop) => {
    plop.setGenerator(
        'nest-module',
        {
            description: 'nest module boilerplate',
            prompts: [
                {
                    type: 'list',
                    name: 'project',
                    message: 'Choose project',
                    choices: projects,
                },
                {
                    type: 'input',
                    name: 'moduleName',
                    message: 'Specify name of the module: lower case; if it consists of few words then separate it with comma',
                },
                {
                    type: 'checkbox',
                    name: 'files',
                    message: 'Choose files to generate',
                    choices: files,
                },
                {
                    type: 'confirm',
                    name: 'isCrud',
                    message: 'Is CRUD controller?',
                },
            ],
            actions: [
                (answers) => {
                    process.chdir(plop.getPlopfilePath());

                    const words = answers.moduleName.split(',').map(word => word.trim());
                    const modifiedAnswers = {
                        ...answers,
                        moduleName: {
                            capitalized: [words[0]].concat(words.slice(1).map(capitalize).join('')),
                            kebabCased: words.join('-'),
                            snakeCased: words.join('_'),
                        },
                        files: files.reduce((acc, fileName) => {
                            acc[fileName] = answers.files.includes(fileName);
                            return acc;
                        }, {}),
                    };
                    const mapSuffixToConfig = (suffix) => {
                        const fileName = suffix === 'types'
                            ? 'types.ts'
                            : `${modifiedAnswers.moduleName.dashed}.${suffix}.ts`;
                        const directory = `./apps/${modifiedAnswers.project}/src/modules/${modifiedAnswers.moduleName.dashed}`;
                        return {
                            directory: directory,
                            fileName: fileName,
                            templateFile: `./plop/templates/server/${suffix}.hbs`,
                        };
                    };

                    const filesToCreate = files
                        .filter(suffix => answers.files.includes(suffix))
                        .map(mapSuffixToConfig);
                    const cwd = process.cwd();

                    for (const data of filesToCreate) {
                        const directoryPath = path.join(cwd, data.directory);
                        const filePath = path.join(directoryPath, data.fileName);
                        const templateFilePath = path.join(cwd, data.templateFile);
                        const template = fs.readFileSync(templateFilePath, { encoding: 'utf8' });
                        const content = plop.renderString(template, modifiedAnswers);
                        
                        if (!fs.existsSync(filePath)) {
                            fs.mkdirSync(data.directory, { recursive: true });
                            fs.writeFileSync(filePath, content, { encoding: 'utf8', flag: 'wx' });
                        }
                    }
                },
            ]
        }
    );
}