import { ref } from "vue"
import { defineStore } from "pinia"

export const useResumeStore = defineStore("resume", () => {
    const name = ref("")
    const title = ref("")

    const address = ref("")
    const email = ref("")
    const phone = ref("")
    const drivingLicense = ref("")

    const linkedIn = ref("")
    const gitHub = ref("")
    const website = ref("")
    const workingDays = ref([1, 2, 3, 4, 5])

    return { address, drivingLicense, email, gitHub, linkedIn, name, phone, title, website }
})
