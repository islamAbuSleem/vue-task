<template>
  <div class="country">
    <div class="add">
      <new-city
        @close="close"
        @addCountry="addCity"
        placeholder="City Name"
        buttonText="Add New City"
        v-if="closeNew"
      ></new-city>
    </div>
    <div class="wrap">
      <span class="add-icon" @click="closeNew = true"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          /></svg
      ></span>

      <span class="edit" @click="edit = true"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          /></svg
      ></span>
      <h3>{{ data.name }}</h3>
      <template v-if="edit">
        <input
          type="text"
          class="edit-country-name"
          v-model="country.name"
          autofocus
          
        />
      </template>
      <hr />
      <p>Available Cities</p>
      <div class="city-container">
        <city class="city" v-for="city in cities" :data="city" :key="city.id"></city>
      </div>
      <div class="actions" v-if="edit">
        <button class="save delete" @click="DeleteCountry">Delete this country</button>
        <button class="save" @click="saveChanges">save</button>
        <button class="save cancel" @click="edit=false">Cancel</button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import city from "./city.vue";
import newCity from "../components/newItem.vue";

let accessToken;
export default {
  props: ["data"],
  components: { city, newCity },
  data() {
    return {
      cities: [],
      closeNew: false,
      edit: false,
      country: this.data,
    };
  },
  created() {
    accessToken = localStorage.getItem('accessToken')
    this.getAllCities();
  },
  methods: {
    async getAllCities() {
      try {
        let res = await axios.get(
          `https://taskfrontendapi.azurewebsites.net/api/city/getcities/${this.data.id}`,
          {
            headers: {
              Authorization: ` Bearer ${accessToken}`,
            },
          }
        );
        this.cities = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    close() {
      this.closeNew = false;
    },
    async addCity(CityData) {
      
      try {
        await axios.post(
          `https://taskfrontendapi.azurewebsites.net/api/city`,
          { Name: CityData, CountryId: this.data.id },
          {
            headers: {
              Authorization: ` Bearer ${accessToken}`,
            },
          }
        );
        this.getAllCities();
      } catch (e) {
        console.error(e);
      }
      this.close();
    },
    saveChanges(){
        console.log( { Id: this.country.id, Name: this.country.name});
       let res =  axios.put( `https://taskfrontendapi.azurewebsites.net/api/country`,
          { Id: this.country.id, Name: this.country.name, CountryId: this.country.id},
          {
            headers: {
              Authorization: ` Bearer ${accessToken}`,
            },
          }
        );
        console.log(res)
        this.edit=false
    },
    DeleteCountry(){
          this.$emit('delete',this.country.id)
                    this.edit=false;

    }
  },
};
</script>

<style lang="scss" scoped>
.country {
  .wrap {
    position: relative;
    border: 1px solid rgb(100, 95, 95);
    width: 25vw;
    padding: 0px 15px;
    margin: 7px;
    border-radius: 5px;
        @media (max-width: 768px) {
      width: 75vw;
    }
    p {
      &::after {
        content: "";
        border-bottom: 1px solid #b7b7b7;
        width: 50px;
        display: block;
        margin: 6px auto;
      }
    }
    .city-container {
      display: flex;
      justify-content: center;
  flex-wrap: wrap;
  .city{
    width: 40%;
  }
    }
    .actions{
        display: flex;
        justify-content: space-between;
        button{
            margin: 10px;
        }
    }
    .edit-country-name {
      padding: 4px;
      margin: 0 5px;
      border-radius: 4px;
      border: 1px solid #aaa;
    }
    button.save {
        margin: 20px 0 5px;
      padding: 10px;
      background-color: #1dd1a1;
      border: 1px solid #eee;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      font-weight: 600;
      &.delete{
          background-color: #ff6b6b;
      }
      &.cancel{
          background-color: #c8d6e5;
          color: #333;

      }

    }
    .add-icon {
      display: block;
      position: absolute;
      left: 9px;
      top: 9px;
      cursor: pointer;
      svg {
        height: 25px;
        width: 25px;
      }
    }
    .edit {
      display: block;
      position: absolute;
      right: 9px;
      top: 9px;
      cursor: pointer;
      svg {
        height: 25px;
        width: 25px;
      }
    }
  }
}
</style>
