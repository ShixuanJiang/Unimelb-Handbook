# Generated by Django 4.2 on 2024-10-03 13:12

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registrationDate', models.DateTimeField(auto_created=True, auto_now=True, verbose_name='RegisterDate')),
                ('phone', models.CharField(auto_created=True, blank=True, default='13824464121', help_text='Phone', max_length=11, verbose_name='Phone')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('is_delete', models.BooleanField(default=False, verbose_name='delte')),
                ('name', models.CharField(blank=True, default='Demo', max_length=255, null=True, verbose_name='Name')),
                ('job', models.CharField(blank=True, default='SoftJob', max_length=255, null=True, verbose_name='work')),
                ('jobName', models.CharField(blank=True, default='SoftWare', max_length=255, null=True, verbose_name='workname')),
                ('organizationName', models.TextField(blank=True, default='Front', null=True, verbose_name='organization')),
                ('locationName', models.TextField(blank=True, default='ShangHai', null=True, verbose_name='PositionName')),
                ('avatar', models.URLField(blank=True, default='https://ytouch-1258011219.cos.ap-nanjing.myqcloud.com/ww.jpg', null=True, verbose_name='Avatar')),
                ('organization', models.TextField(blank=True, default='Front', null=True, verbose_name='Comm')),
                ('location', models.TextField(blank=True, default='ShangHai', null=True, verbose_name='Position')),
                ('introduction', models.TextField(blank=True, default='Do Artist', null=True, verbose_name='Introduce')),
                ('personalWebsite', models.URLField(blank=True, default='https://github.com/huifeng-kooboo', null=True, verbose_name='Personal Website')),
                ('accountId', models.CharField(blank=True, default='13824464121', max_length=255, null=True, verbose_name='AccountId')),
                ('certification', models.IntegerField(default=1, verbose_name='Authenticated')),
                ('role', models.CharField(blank=True, choices=[('admin', 'Manage'), ('user', 'CommonUser')], default='admin', max_length=255, null=True, verbose_name='Character')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'User',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='ChildMenuInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=255, verbose_name='Path')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('children', models.ManyToManyField(blank=True, to='user.childmenuinfo', verbose_name='ChildMenu')),
            ],
            options={
                'verbose_name': 'ChileMenu',
                'verbose_name_plural': 'ChileMenu',
            },
        ),
        migrations.CreateModel(
            name='RouterMeta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roles', models.CharField(blank=True, max_length=255, null=True, verbose_name='asadfs')),
                ('requiresAuth', models.BooleanField(default=False, verbose_name='asfas')),
                ('icon', models.CharField(blank=True, max_length=255, null=True, verbose_name='icon')),
                ('locale', models.CharField(blank=True, default='', max_length=255, null=True, verbose_name='locale')),
                ('hideInMenu', models.BooleanField(blank=True, null=True, verbose_name='assaf')),
                ('hideChildrenInMenu', models.BooleanField(blank=True, null=True, verbose_name='asfsaasf')),
                ('activeMenu', models.CharField(blank=True, max_length=255, null=True, verbose_name='djaijds')),
                ('order', models.IntegerField(blank=True, null=True, verbose_name='sdajjds')),
                ('noAffix', models.BooleanField(blank=True, null=True, verbose_name='is addtach')),
                ('ignoreCache', models.BooleanField(blank=True, null=True, verbose_name='ignorCache')),
            ],
            options={
                'verbose_name': 'RouteMeta',
                'verbose_name_plural': 'RouteMeta',
            },
        ),
        migrations.CreateModel(
            name='ServerData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=250, unique=True, verbose_name='Key')),
                ('value', models.TextField(verbose_name='Value')),
            ],
            options={
                'verbose_name': 'ServerData',
                'verbose_name_plural': 'ServerData',
            },
        ),
        migrations.CreateModel(
            name='UserLoggerInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('logger_info', models.TextField(blank=True, help_text='ContentLogger', null=True, verbose_name='LogContent')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='CreateTime')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='UpdateTime')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Role')),
            ],
            options={
                'verbose_name': 'Log',
                'verbose_name_plural': 'Log',
            },
        ),
        migrations.CreateModel(
            name='MenuInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=255, verbose_name='Path')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('children', models.ManyToManyField(blank=True, to='user.childmenuinfo', verbose_name='ChildMenu')),
                ('meta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='user.routermeta', verbose_name='RouteMeta')),
            ],
            options={
                'verbose_name': 'Menu',
                'verbose_name_plural': 'Menu',
            },
        ),
        migrations.AddField(
            model_name='childmenuinfo',
            name='meta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='user.routermeta', verbose_name='MetaInfo'),
        ),
    ]
