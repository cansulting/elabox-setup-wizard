//go:build !linux
// +build !linux

package main

func SetupSwapping() error {
	return nil
}
