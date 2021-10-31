import axios from "axios";

const otmAPI = 'https://api.opentripmap.com/0.1/en/places/';
const apiKey = 'apikey=5ae2e3f221c38a28845f05b6097eb94fe65fbc1c3616fa86e2f7941d';


const SightService = {
    fetchSightsByCity: (city, radius, setSights) => {
        fetch(otmAPI + 'geoname?name=' + city + '&' + apiKey)
            .then(response => response.json())
            .then(body => {
                fetch(otmAPI + 'radius?radius=' + radius + '&lon=' + body.lon + '&lat=' + body.lat + '&' + apiKey)
                    .then(response2 => response2.json())
                    .then(body2 => {
                        let temp = [];
                        body2.features.map(x => {
                            if (x.properties.name !== '') {
                                temp.push(x.properties);
                            }
                        });
                        setSights(temp);
                    })
            });
    },
    setSelectedSight: (xid, setSelectedSight, isSelected, setIsSelected) => {
        setSelectedSight(null);
        if (!isSelected) {
            setIsSelected(true);
        }
        fetch(otmAPI + 'xid/' + xid + '?' + apiKey)
            .then(response => response.json())
            .then(body => {
                axios.post("/sights/getSight", body).then(response => {
                    setSelectedSight(response.data.data);
                });
            });
    },
    update: (xid, value, comments, setSelectedSight, setSubmitting, setValue) => {
        axios.put("/sights/update", {xid: xid, rate: value, comments: comments}).then(response => {
            setSelectedSight(response.data.sight);
            if (!!setSubmitting) {
                setSubmitting(false);
                setValue('');
            }
        })
    }
}

Object.freeze(SightService);
export default SightService;
