# Generated by Django 4.2 on 2023-11-09 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_alter_user_accountid_alter_user_introduction_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(blank=True, choices=[('admin', '管理员'), ('user', '普通用户')], default='admin', max_length=255, null=True, verbose_name='角色'),
        ),
    ]
