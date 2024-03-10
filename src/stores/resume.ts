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

    const workExperience = ref([])

    return { address, drivingLicense, email, gitHub, linkedIn, name, phone, title, website, workExperience }
})
