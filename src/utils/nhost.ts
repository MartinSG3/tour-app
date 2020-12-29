import nhost from "nhost-js-sdk";
import { isPlatform } from "@ionic/react"
import { Plugins } from "@capacitor/core"

const { Storage } = Plugins;

// Backend Nhost
let config;

if (isPlatform('capacitor')) {
  config = {
    base_url: /* backend nhost url */,
    client_storage: Storage,
    client_storage_type: "capacitor"
  };
} else {
  config = {
    base_url: /* backend nhost url */,
    client_storage_type: "web"
  };
}

nhost.initializeApp(config);

// Auth of users
const auth = nhost.auth();
// Storing of picture
const storage = nhost.storage();

export { auth, storage };