import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, Platform } from 'ionic-angular';

import * as Leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  center: {lat: number, lng: number};
  cordenadas: any;
  lat: any;
  lng: any;
  edificio: any;
  android: any
  ios: string;
  dom: any;
  zoom: any;
  tel: any;
  nav: any;
  plat: any;
  

  constructor(public navCtrl: NavController, private params:NavParams, public platform: Platform) {
    
   this.lat = params.data.data.lat;
   this.lng = params.data.data.lon;
   this.center = {lat: this.lat, lng: this.lng}
   this.edificio = params.data.data.edificio;
   this.zoom = params.data.data.zoom;
   this.dom = params.data.data.domicilio;
   this.tel = params.data.data.telefono;
   this.ios = 'http://maps.apple.com?addr=Current%20Location&daddr='+ this.lat +',' + this.lng;
   this.android = 'http://maps.google.com?addr=Current%20Location&daddr='+ this.lat +',' + this.lng;
   
   
  }

  ngOnInit(): void {
    this.drawMap();

  }
  drawMap(): void {
    let map = Leaflet
    .map('map')
    .setView(this.center, this.zoom)
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',)
    .addTo(map);
    console.log(map.center,'let map')


   Leaflet.marker(this.center).addTo(map)
    .bindPopup('<b>'+this.edificio+'</b>'+'<br> <b>Domicilio:</b> '+this.dom+'<br> <b>Telefono:</b> '+this.tel).openPopup();

   var radius =  this.zoom * 2;
   console.log( radius,'radius')
   Leaflet.circle(this.center, radius).addTo(map);

  }

  ionViewDidLoad(){
     
   if (this.platform.is('android')) {
        this.plat = this.android
   }
   if (this.platform.is('ios')) {
      console.log('es ios', this.ios,'cambio')  
     this.plat = this.ios
   } else {
     console.log('Información no disponible')
   }

}
}
