<template>
  <div class="home">
    <div class="container">
      <div class="wrap">
        <city
        @saveChanges="saveChanges"
        @deletCity="deletCity"
          class="city"
          v-for="city in cities"
          :data="city"
          :key="city.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import city from "../components/displayAllCities.vue";
import axios from 'axios'

  let accessToken ;

export default {
  name: "Home",
  components: {
    city,
  },
  data() {
    return {
      closeNew:false,
      cities: [],
    };
  },
  created(){
    accessToken = localStorage.getItem('accessToken')
    this.getAllCities()
  },
  methods:{
   async getAllCities(){
         try{
     
    let res = await axios.get('https://taskfrontendapi.azurewebsites.net/api/city',{
      headers:{
        'Authorization': ` Bearer ${accessToken}`
      }
    })
    console.log(res)
    this.cities = res.data
   }catch(e){
     console.log( 'caught error')
           console.error(e);
        if(e.response.status == 401){
        localStorage.removeItem('accessToken')
        }
   }
    },
    async saveChanges(cityData){
               try{
   await axios.put(`https://taskfrontendapi.azurewebsites.net/api/city`,{ Id: cityData.id, Name: cityData.name, CountryId: cityData.countryId},{
      headers:{
        'Authorization': ` Bearer ${accessToken}`
      }
    })
    this.getAllCities()
   }catch(e){
     console.error(e)
   }
    },
   async deletCity(cityData){
     await axios.delete(`https://taskfrontendapi.azurewebsites.net/api/city/${cityData.id}`, {
            headers: {
              Authorization: ` Bearer ${accessToken}`,
            },
          })
  this.getAllCities()
    }
  }
};
</script>


<style lang="scss" scoped>
.home {
    .wrap {
      display: flex;
      justify-content: center;
      flex-wrap: wrap; 
}
}
</style>