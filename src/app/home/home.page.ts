import { Component } from "@angular/core";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Platform } from '@ionic/angular';

declare let cordova: any;

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(
    private locationAccuracy: LocationAccuracy,
    private platform : Platform
    ) {}

	ngOnInit() {
    this.platform.ready()
    .then(()=>{
      cordova.plugins.autoStart.enable();
		  this.ActivarGps();
    })
	}

	ActivarGps() {
		this.locationAccuracy.canRequest().then((canRequest: boolean) => {
			if (canRequest) {
				// the accuracy option will be ignored by iOS
				this.locationAccuracy
					.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
					.then(
						() => console.log("Request successful"),
						error =>
							console.log("Error requesting location permissions", error),
					);
			}
		});
  }
  
  GetPosition(){
    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
  }

	// onSuccess Geolocation
	//
	onSuccess(position) {
		var element = document.getElementById("geolocation");
		element.innerHTML =
			"Latitude: " +
			position.coords.latitude +
			"<br />" +
			"Longitude: " +
			position.coords.longitude +
			"<br />" +
			"Altitude: " +
			position.coords.altitude +
			"<br />" +
			"Accuracy: " +
			position.coords.accuracy +
			"<br />" +
			"Altitude Accuracy: " +
			position.coords.altitudeAccuracy +
			"<br />" +
			"Heading: " +
			position.coords.heading +
			"<br />" +
			"Speed: " +
			position.coords.speed +
			"<br />" +
			"Timestamp: " +
			position.timestamp +
			"<br />";
	}

	// onError Callback receives a [PositionError](PositionError/positionError.html) object
	//
	onError(error) {
		alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
	}
}
