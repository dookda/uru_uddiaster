import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public map: any;

  constructor(
    public service: ServiceService
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    this.map = new L.Map('map', {
      center: [17.747829, 100.002905],
      zoom: 13
    });

    const mbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy;',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiY3NrZWxseSIsImEiOiJjamV1NTd1eXIwMTh2MzN1bDBhN3AyamxoIn0.Z2euk6_og32zgG6nQrbFLw'
    });

    const grod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const ghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const gter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // overlay map
    const mapUrl = 'http://map.nu.ac.th/geoserver-hgis/ows?';
    const cgiUrl = 'http://www.cgi.uru.ac.th/geoserver/ows?';
    const w3Url = 'http://www3.cgistln.nu.ac.th/geoserver/gistdata/ows?';
    const firms = 'https://firms.modaps.eosdis.nasa.gov/wms?';

    const pro = L.tileLayer.wms(cgiUrl, {
      layers: 'th:province_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: 'th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const stream = L.tileLayer.wms(cgiUrl, {
      layers: 'upn:ll_stream',
      format: 'image/png',
      transparent: true,
      zIndex: 5
    });

    const rainInterp = L.tileLayer.wms(w3Url, {
      layers: 'gistdata:geotiff_coverage',
      format: 'image/png',
      transparent: true,
      zIndex: 1
    });

    const markers = await L.layerGroup().addTo(this.map);

    const baseMap = {
      'แผนที่ถนน': grod,
      'แผนที่ภูมิประเทศ': gter.addTo(this.map),
      'แผนที่ผสม': ghyb
    };

    const overLay = {
      'ขอบเขตจังหวัด': pro.addTo(this.map),
      'ขอบเขตอำเภอ': amp.addTo(this.map),
      'ขอบเขตตำบล': tam.addTo(this.map),
      'แหล่งน้ำ': stream.addTo(this.map)
    };

    L.control.layers(baseMap, overLay).addTo(this.map);

    const markerIcon = await this.service.blueIcon;

    const iconNow = L.icon({
      iconUrl: markerIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    this.service.getCheckpoint().then((res: any) => {
      const marker = L.geoJSON(res, {
        pointToLayer: (feature: any, latlon: any) => {
          return L.marker(latlon, {
            icon: iconNow,
            iconName: 'dengue'
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          if (feature.properties) {
            layer.bindPopup(
              'ชื่อ: ' + feature.properties.vill_nam_t + '</br>'
            );
          }
        }
      });
      markers.addLayer(marker);
    });

  }

}
