import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        product,
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

export default new DeliveryMail();
