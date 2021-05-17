import axios from "axios";
import {user} from "../stores";

export class PoiService {
  categoryList = [];
  poiList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.donation) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.donation);
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories");
      this.categoryList = response.data;
      return this.categoryList;
    } catch (error) {
      return [];
    }
  }

  async getPois() {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois");
      this.poiList = response.data;
      return this.poiList;
    } catch (error) {
      return [];
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      this.userList = response.data;
      return this.userList;
    } catch (error) {
      return [];
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        user.set({
          email: email,
          token: response.data.token
        });
        localStorage.donation = JSON.stringify(response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.donation = null;
  }

  async poi(name, location, latitude, longitude, image, category, submitter) {
    try {
      const poi = {
        name: name,
        location: location,
        latitude: latitude,
        longitude: longitude,
        image: image,
        category: category,
        submitter: submitter
      };
      this.poiList.push(poi);
      const response = await axios.post(this.baseUrl + "/api/pois/" + poi._id);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }

}