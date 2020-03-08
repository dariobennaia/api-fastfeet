import { format } from 'date-fns';
import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, delivery } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancelDelivery',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        canceledAt: format(
          new Date(delivery.canceledAt),
          'dd/MM/yyyy HH:mm:ss'
        ),
        client: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement || 'Nenhum',
        state: recipient.state,
        city: recipient.city,
        postCode: recipient.postCode,
      },
    });
  }
}

export default new CancelDeliveryMail();
