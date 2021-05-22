import { writable } from "svelte/store";

export const welcomeBar = [
  {
    title: "Sign Up",
    icon: "fas fa-user-cog fa-3x",
    colour: "color:rgb(153, 196, 74)",
    link: "/#/signup",
  },
  {
    title: "Log In",
    icon: "fas fa-user-edit fa-3x",
    colour: "color:rgb(153, 196, 74)",
    link: "/#/login",
  },
];

export let mainBar = [{
  title: "Poi",
  icon: "fas fa-hand-holding-usd fa-3x",
  colour: "color:rgb(153, 196, 74)",
  link: "/#/poi",
}, {
  title: "POIs",
  icon: "fas fa-clipboard-list fa-3x",
  colour: "color:rgb(153, 196, 74)",
  link: "/#/pois",
}, {
  title: "Settings",
  icon: "fas fa-sliders-h fa-3x",
  colour: "color:rgb(153, 196, 74)",
  link: "/#/settings",
},{
  title: "Logout",
  icon: "fas fa-sign-out-alt fa-3x",
  colour: "color:rgb(153, 196, 74)",
  link: "/#/logout",
},];

export const navBar = writable({
  bar: [],
});
export const title = writable("");
export const subTitle = writable("");

export const user = writable({
  email: "",
  token: ""
});