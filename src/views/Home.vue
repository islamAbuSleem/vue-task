<template>
  <div class="home">
    <div class="container">
      <div class="add">
        <h4 class="add-new" @click.prevent="closeNew = true">Add New Country</h4>
        <new-country
          @close="close"
          @addCountry="addCountry"
          placeholder="Country Name"
          buttonText="Add New Country"
          v-if="closeNew"
        ></new-country>
      </div>
      <div class="wrap">
        <country
          class="country"
          @delete="deleteCountry"
          v-for="country in countries"
          :data="country"
          :key="country.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import country from "../components/displayName.vue";
import newCountry from "../components/newItem.vue";
import axios from "axios";

let accessToken;

export default {
  name: "Home",
  components: {
    country,
    newCountry,
  },
  data() {
    return {
      closeNew: false,
      countries: [],
    };
  },
  created() {
    accessToken = localStorage.getItem("accessToken");
    this.getAllCountries();
  },
  methods: {
    goToCities(id) {
      this.$router.push({ name: "city", params: { id: id } });
    },
    async addCountry(countryData) {
      try {
        await axios.post(
          "https://taskfrontendapi.azurewebsites.net/api/country",
          { Name: countryData },
          {
            headers: {
              Authorization: ` Bearer ${accessToken}`,
            },
          }
        );
        this.getAllCountries();
      } catch (e) {
        console.error(e);
      }
      this.closeNew = false;
    },
    close() {
      this.closeNew = false;
    },
    async getAllCountries() {
      try {
        let res = await axios.get(
          "https://taskfrontendapi.azurewebsites.net/api/country",
          {
            headers: {
              Authorization: ` Bearer ${accessToken}`,
            },
          }
        );
        console.log(res);
        this.countries = res.data;
      } catch (e) {
        console.error(e);
        if (e.response.status == 401) {
          localStorage.removeItem("accessToken");
        }
      }
    },
    async deleteCountry(id) {
      await axios.delete(`https://taskfrontendapi.azurewebsites.net/api/country/${id}`, {
        headers: {
          Authorization: ` Bearer ${accessToken}`,
        },
      });
      this.getAllCountries();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .add {

    .add-new {
      text-align: left;
      cursor: pointer;
      width: 15vw;
      text-align: center;
      padding: 10px;
      border-radius: 7px;
      background: rgb(241, 241, 241);
    @media (max-width: 768px) {
      width: 95%;
    }
    }
  }
  .wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>
