const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});
const fs = require('fs');

const passwordman = {
	senha: [],
	tamanhoDaSenha: 15,
	site: null,
	username: null,
	email: null,
	digitos: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*.,?^~',
	
	gerarSenha: function() {
		for (let i = 0; i < this.tamanhoDaSenha; i++) {
			let randNum = Math.floor(Math.random() * this.digitos.length)
			this.senha.push(this.digitos[randNum]);
		}
		this.senha = this.senha.join('');
		console.log(`\nsua senha é ${this.senha}`);
	},
	
	perguntarInfo: function() {
		rl.question('\ndigite o SITE com o qual você deseja vincular essa senha [enter para nenhum]: ', input => {
		this.site = input;
			rl.question('\ndigite o USERNAME ou EMAIL com o qual você deseja vincular essa senha [enter para nenhum]: ', input2 => {
			/\w+[0-9]*@\w+\.\w+/gi.test(input2) ? this.email = input2 : this.username = input2;
			const info = this.organizarInfo();
			this.salvarInfo(info);
			rl.close();
			});
		});
	},
	
	organizarInfo: function() {
		let output = `\nSenha: ${this.senha}`;
		if (this.site) output += `\nSite: ${this.site}`;
		if (this.username) output += `\nUsername: ${this.username}\n----------------------------------------------`;
		if (this.email) output += `\nE-mail: ${this.email}\n----------------------------------------------`;
		return output;
	},
	
	salvarInfo: function(str) {
		fs.appendFile('senhas_salvas.txt', str, err => {
			if (err) throw err;
			else console.log('\n-----SENHA SALVA COM SUCESSO!-----\n');
		});
	}
	
};



passwordman.gerarSenha();
passwordman.perguntarInfo();
