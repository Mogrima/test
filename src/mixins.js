import accounting from 'accounting'

export default {
    methods: {
        $price(num) {
            return accounting.formatNumber(num, 0, ' ')
        }
    },
}