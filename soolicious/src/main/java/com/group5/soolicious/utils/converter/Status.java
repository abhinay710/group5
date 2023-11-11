package com.group5.soolicious.utils.converter;

public enum Status {
    ACTIVE('A'), INACTIVE('I');

    private Character value;

    Status(Character value) {
        this.value = value;
    }

    public Character getValue() {
        return value;
    }
}
