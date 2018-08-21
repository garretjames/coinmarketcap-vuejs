<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="example">
          <table class="crypto-table">
            <thead>
            <tr>
              <th><h1>#</h1></th>
              <th><h1>Name</h1></th>
              <th><h1>Symbol</h1></th>
              <th><h1>Price (USD)</h1></th>
              <th><h1>7 Day Change (%)</h1></th>
              <th><h1>Conversion</h1></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="coin in coins" v-bind:key="coin.id">
              <td>{{ coin.rank }}</td>
              <td>{{ coin.name }}</td>
              <td>{{ coin.symbol }}</td>
              <td>{{ coin.price_usd }}</td>
              <td>{{ coin.percent_change_7d }}</td>
              <td v-on:click="show(coin.name)"><img width="35" height="35" src="../assets/convertImg.png" /></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <modal @before-open="beforeOpen" classes="conversion-form" width="300" height="260" name="conversion-form">
          <div>
            <form>
              <div class="form-group">
                <label for="usd">Amount (USD)</label>
                <input type="text" class="form-control" v-model="input.amount" id="usd" placeholder="Amount (USD)">
              </div>
              <div class="form-group">
                <label>
                  <select v-model="coinName">
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
        </modal>

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
      specific_coin_amount: 0,
      timer: '',
      coinName: ''
    }
  },
  created: function () {
    this.fetchCoinInfo()
    setInterval(this.fetchCoinInfo, 10000)
  },
  methods: {
    fetchCoinInfo: function () {
      axios({ method: 'GET', 'url': 'https://api.coinmarketcap.com/v1/ticker/?limit=15' }).then(result => {
        this.coins = result.data
      }, error => {
        console.error(error)
      })
    },
    show (coinName) {
      this.$modal.show('conversion-form', {coinName: coinName})
    },
    hide () {
      this.$modal.hide('conversion-form')
    },
    beforeOpen (event) {
      console.log(event.params.coinName)
      this.coinName = event.params.coinName
    },
    cancelAutoUpdate: function () { clearInterval(this.timer) },
    beforeDestroy () {
      clearInterval(this.timer)
    },
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
<style src="../styles/table.css"></style>
<style src="../styles/modal.css"></style>
