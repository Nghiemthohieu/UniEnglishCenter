package initialize

import (
	"fmt"
	"uni_server/global"

	"github.com/spf13/viper"
)

func LoadConfig() {
	viper := viper.New()
	viper.AddConfigPath("../../config")
	viper.SetConfigName("local")
	viper.SetConfigType("yaml")

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("error reading configuration file: %v", err))
	}

	// read server configuration
	// fmt.Println("server Port::", viper.GetInt("server.port"))
	// fmt.Println("security jwt key::", viper.GetString("security.jwt.key"))

	if err := viper.Unmarshal(&global.Config); err != nil {
		fmt.Printf("Unable to decode configuration: %v", err)
	}
}
