import Music from "../api/Music";
import { ref } from "vue";

let signs = ref([]) as any;

const musicSign = () => {
    Music.get()
        .then((res) => {
            signs = res.data.msg;
        })
        .catch((res) => {
            console.log(res);
        });
};

export { signs }