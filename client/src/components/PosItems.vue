<template>
    <div>
        <button v-for="item in items" @click="itemClicked(item)">
            <strong>{{ item.name }}</strong> - {{ item.price }}
        </button>
    </div>
</template>

<script>
export default {
    props: ['items', 'add'],
    methods: {
        itemClicked: function(item) {
            this.add(item);
        }
    }
};
</script>
