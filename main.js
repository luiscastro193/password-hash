"use strict";
import {passwordHash} from './password.js';

const form = document.querySelector("form");
const hash = document.querySelector("p");

form.onsubmit = async event => {
	event.preventDefault();
	hash.textContent = await passwordHash(form["password"].value, form["salt"].value);
};

form.oninput = () => {hash.textContent = ''};
