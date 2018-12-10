<template>
<v-container>
    <table v-if="counter">
        <thead>
            <tr>
                <th>Name</th>
                <th>Number of Items</th>
                <th>Amount</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="item in items">
                <td>{{ item.item.name }}</td>
                <td>
                    <span v-if="!item.editing" @dblclick="toggleEdit(item)">{{ item.numberOfItems }}</span>
                    <input v-if="item.editing" @blur="toggleEdit(item)" type="number" v-model="item.numberOfItems">
                </td>
                <td>{{ item.numberOfItems * item.item.price }}</td>
                <td><i @click="removeItem(item)">-</i></td>
            </tr>
        </tbody>
    </table>
    <p v-if="!items.length">No items have been added.</p>
    <table>
        <tbody>
            <tr>
                <td>Subtotal:</td>
                <td>{{ subtotal }}</td>
            </tr>
            <tr>
                <td>Tax:</td>
                <td>{{ tax }}</td>
            </tr>
            <tr>
                <td>Total:</td>
                <td>{{ total }}</td>
            </tr>
        </tbody>
    </table>
    </v-container>
</template>

<script>
module.exports = {
    props: ['items', 'edit', 'remove'],
    computed: {
        subtotal: function() {
            var subtotal = 0;

            this.items.forEach(function(item) {
                subtotal += item.item.price * item.numberOfItems;
            });

            return subtotal;
        },
        tax: function() {
            return this.subtotal * 0.065;
        },
        total: function() {
            return this.subtotal + this.tax;
        },
        counter: function() {
            return this.items.length
        }
    },
    methods: {
        toggleEdit: function(item) {
            this.edit(item);
        },
        removeItem: function(item) {
            this.remove(item);
        }
    }
};
</script>