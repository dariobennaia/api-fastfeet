module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('deliverymen', ['avatar_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_deliverymen_files',
      references: {
        table: 'files',
        field: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'deliverymen',
      'fk_deliverymen_files'
    );
  },
};
