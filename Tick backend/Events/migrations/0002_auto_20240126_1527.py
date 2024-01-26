from django.db import migrations

def create_default_stadiums(apps, schema_editor):
    Stadium = apps.get_model('Events', 'Stadium')
    Stadium.objects.bulk_create([
        Stadium(name="ALAWWAL PARK"),
        Stadium(name="Kingdom Arena"),
        Stadium(name="استاد الملك فهد"),
        Stadium(name="ملعب الامير عبدالله الفيصل"),
        Stadium(name="ملعب الأمير فيصل بن فهد"),
        Stadium(name="ملعب الجوهرة"),
        # Add more default stadiums as needed
    ])

def create_default_theaters(apps, schema_editor):
    Theater = apps.get_model('Events', 'Theater')
    Theater.objects.bulk_create([
        Theater(name="قاعة مرايا"),
        Theater(name="مسرح ابوبكر سالم"),
        Theater(name="مسرح المملكة ارينا"),
        Theater(name="مسرح محمد عبدة"),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_stadiums),
        migrations.RunPython(create_default_theaters),
    ]
