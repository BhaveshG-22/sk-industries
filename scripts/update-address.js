const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateAddress() {
  try {
    console.log('🏢 Updating SK Industries address information...');

    const addressUpdates = [
      {
        key: 'contact_address',
        value: 'Gat No 107.108, Near Hotel Pandurang Krupa, Jyotiba Nagar, Talawade, Pune - 411062',
        description: 'Business address',
        category: 'contact',
        type: 'text'
      },
      {
        key: 'footer_address_line1',
        value: 'Gat No 107.108, Near Hotel Pandurang Krupa',
        description: 'Address line 1',
        category: 'footer',
        type: 'text'
      },
      {
        key: 'footer_address_line2',
        value: 'Jyotiba Nagar, Talawade',
        description: 'Address line 2',
        category: 'footer',
        type: 'text'
      },
      {
        key: 'footer_city_state_zip',
        value: 'Pune, Maharashtra 411062',
        description: 'City, state and zip code',
        category: 'footer',
        type: 'text'
      },
      {
        key: 'footer_country',
        value: 'India',
        description: 'Country',
        category: 'footer',
        type: 'text'
      }
    ];

    let updatedCount = 0;
    let createdCount = 0;

    for (const setting of addressUpdates) {
      const existingSetting = await prisma.siteSetting.findUnique({
        where: { key: setting.key }
      });

      if (existingSetting) {
        await prisma.siteSetting.update({
          where: { key: setting.key },
          data: {
            value: setting.value,
            description: setting.description,
            category: setting.category,
            type: setting.type
          }
        });
        console.log(`✅ Updated: ${setting.key}`);
        updatedCount++;
      } else {
        await prisma.siteSetting.create({
          data: setting
        });
        console.log(`✨ Created: ${setting.key}`);
        createdCount++;
      }
    }

    console.log('\n🎉 Address update completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Updated: ${updatedCount} settings`);
    console.log(`   - Created: ${createdCount} settings`);
    console.log(`   - Total: ${updatedCount + createdCount} address settings processed`);

    console.log('\n📍 New Address:');
    console.log('   Gat No 107.108, Near Hotel Pandurang Krupa');
    console.log('   Jyotiba Nagar, Talawade');
    console.log('   Pune, Maharashtra 411062');
    console.log('   India');

  } catch (error) {
    console.error('❌ Error updating address:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateAddress();