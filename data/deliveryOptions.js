import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function validDeliveryOption(deliveryOptionId) {
    let isValid = false;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            isValid = true;
        }
    });
    return isValid;
}

export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        const dayOfWeek = deliveryDate.format('dddd');
        if (dayOfWeek !== 'Saturday' && dayOfWeek !== 'Sunday') {
            remainingDays--;
        }
    }
    return deliveryDate.format('dddd, MMMM D');
}