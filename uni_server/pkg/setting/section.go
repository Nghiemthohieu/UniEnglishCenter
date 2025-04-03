package setting

type Config struct {
	Mysql  MySQLSetting  `mapstructure:"Mysql"`
	Logger LoggerSetting `mapstructure:"Logger"`
	Aws    AwsSetting    `mapstructure:"Aws3s"`
	Gmail  GmailSetting  `mapstructure:"Gmail"`
}

type MySQLSetting struct {
	Host            string `mapstructure:"host"`
	Port            int    `mapstructure:"port"`
	UserName        string `mapstructure:"username"`
	PassWord        string `mapstructure:"password"`
	Dbname          string `mapstructure:"dbname"`
	MaxIdleConns    int    `mapstructure:"maxIdleConns"`
	MaxOpenConns    int    `mapstructure:"maxOpenConns"`
	ConnMaxLifetime int    `mapstructure:"connMaxLifetime"`
}

type LoggerSetting struct {
	Log_level     string `mapstructure:"log_level"`
	File_log_name string `mapstructure:"file_log_name"`
	Max_Backups   int    `mapstructure:"max_backups"`
	Max_age       int    `mapstructure:"max_age"`
	Max_size      int    `mapstructure:"max_size"`
	Compress      bool   `mapstructure:"compress"`
}

type AwsSetting struct {
	BucketName      string `mapstructure:"bucket_name"`
	Region          string `mapstructure:"region"`
	AccessKeyID     string `mapstructure:"access_key_id"`
	SecretAccessKey string `mapstructure:"secret_access_key"`
}

type GmailSetting struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
	User string `mapstructure:"username"`
	Pass string `mapstructure:"password"`
}
