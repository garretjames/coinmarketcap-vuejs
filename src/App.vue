<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="example">
          <table class="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>7 Day Change (%)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="coin in coins" v-bind:key="coin.id">
              <td>{{ coin.name }}</td>
              <td>{{ coin.symbol }}</td>
              <td>{{ coin.price_usd }}</td>
              <td>{{ coin.percent_change_7d }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div class="example">
          <form>
            <div class="form-group">
              <label for="usd">Amount (USD)</label>
              <input type="text" class="form-control" v-model="input.amount" id="usd" placeholder="Amount (USD)">
            </div>
            <div class="form-group">
              <label>
                <select v-model="input.cryptocurrency">
                  <option v-for="coin in coins" v-bind:key="coin.id">{{ coin.name }}</option>
                </select>
              </label>
            </div>
            <button type="button" class="btn btn-default" v-on:click="convert()">Convert</button>
          </form>
          <br />
          <p>
            <strong>Value:</strong> {{ specific_coin_amount }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      coins: [],
      input: {
        amount: 1,
        cryptocurrency: 'bitcoin'
      },
      specific_coin_amount: 0
    }
  },
  mounted () {
    axios({ method: 'GET', 'url': 'https://api.coinmarketcap.com/v1/ticker/?limit=20' }).then(result => {
      this.coins = result.data
    }, error => {
      console.error(error)
    })
  },
  methods: {
    convert () {
      axios({ method: 'GET', 'url': 'https://api.coinmarketcap.com/v1/ticker/' + this.input.cryptocurrency + '/' }).then(result => {
        this.specific_coin_amount = this.input.amount / result.data[0].price_usd
      }, error => {
        console.error(error)
      })
    }
  }
}
</script>

<style>
  body {
    margin-top: 50px;
    background-color: #F0F0F0;
  }
  .example {
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    padding: 10px;
    background-color: #FFFFFF;
  }
</style>
