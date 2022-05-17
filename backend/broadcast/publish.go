package broadcast

import "github.com/cansulting/elabox-system-tools/foundation/logger"

func PublishError(code int, err string) {
	logger.GetInstance().Debug().Msg("publish error: " + err)
}
