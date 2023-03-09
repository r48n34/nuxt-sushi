<script setup lang="ts">
import { ref } from 'vue'
import { NSelect } from 'naive-ui'
import { useAllStoreDataStore } from '~~/store/allStoreDataStore';
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';

const value = ref<null | number>(null); // Selected store id

const singleStore = useSingleStoreDataStore()
const allStoreData = useAllStoreDataStore()

onMounted(() => {
    allStoreData.getAllStoreData();
})

const storeList = computed( () => allStoreData && !!allStoreData.allStoreData
    ? allStoreData.allStoreData.map( v => {
        return {
            label: `${v.storeStatus === "OPEN" ? "✅" : "🛑"} ${v.name}`,
            value: v.id,
            disabled: v.storeStatus !== "OPEN"
        }
    })
    : [{label : "Loading...", value: -1, disabled: true }]
);


watchEffect(async () => {  
    if(!value.value || value.value === -1){
        return
    }

    singleStore.setLoading();
    localStorage.setItem("storeID", value.value+"");
    singleStore.getStoreData(value.value);
})
</script>


<template>
    <n-select v-model:value="value" :options="storeList"/>
</template>