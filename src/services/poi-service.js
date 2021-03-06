import axios from "axios";
import {user} from "../stores";

export class PoiService {
  categoryList = [];
  poiList = [];
  userList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.poi) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.poi);
    }
    console.log("test to see if constructor is working. JWT: ", localStorage.poi);
  };

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        user.set({
          email: email,
          token: response.data.token
        });
        localStorage.poi = JSON.stringify(response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  //CRD Category
  async createCategory(county, province) {
    try {
      const category = {
        county: county,
        province: province,
      };
      const response = await axios.post(this.baseUrl + "/api/categories", category);
      console.log("Added Category: " + category.county + ", " + category.province);
      const newCategory = await response.data;
      user.set(newCategory);
      return true;
    } catch (error) {
      return false;
    }
  };

  async getCategory(category) {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories/" + category);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  async getCategories() {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories");
      this.categoryList = response.data;
      return this.categoryList;
    } catch (error) {
      return [];
    }
  };

  async deleteCategory(category) {
    const response = await axios.delete(this.baseUrl + "/api/categories/" + category);
    console.log("Removing Category: " + category);
    return response.data;
  };

  //CRUD POI
  async createPoi(name, location, latitude, longitude, category, image, submitter) {
    try {
      const poi = {
        name: name,
        location: location,
        latitude: latitude,
        longitude: longitude,
        category: category,
        image: image,
        submitter: submitter
      };
      const response = await axios.post(this.baseUrl + "/api/pois", poi, {image: image});
      return response.status == 200;
    } catch (error) {
      return false;
    }
  };

  async getPoi(poi) {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois/" + poi);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  async findOnePoi(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois/" + id);
      this.poiList = response.data;
      return this.poiList;
    } catch (error) {
      return [];
    }
  };

  async getPois() {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois");
      this.poiList = response.data;
      return this.poiList;
    } catch (error) {
      return [];
    }
  };

  async updatePoi(id, poi) {
    try {
      const response = await axios.post(this.baseUrl + "/api/pois/" + id, poi);
      return response.status == 200;
    } catch (error) {
      return [];
    }
  };

  async deletePoi(poi) {
    const response = await axios.delete(this.baseUrl + "/api/pois/" + poi);
    console.log("Removing POI: " + poi);
    return response.data;
  };

  //CRUD User
  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      const response = await axios.post(this.baseUrl + "/api/users", userDetails);
      const newUser = await response.data;
      user.set(newUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  async getUser(user) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (error) {
      return [];
    }
  };

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      this.userList = response.data;
      return this.userList;
    } catch (error) {
      return [];
    }
  };

  async updateSettings(firstName, lastName, email, password, id) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        _id: id
      };
      console.log(userDetails);
      const response = await axios.put(`${this.baseUrl}/api/users/${id}`, userDetails);
      const newUser = await response.data;
      user.set(newUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  async deleteUser(user) {
    const response = await axios.delete(this.baseUrl + "/api/users/" + user);
    console.log("Removing User: " + user);
    return response.data;
  };

  async logout() {
    user.set({
      email: "",
      token: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.poi = null;
  };

}