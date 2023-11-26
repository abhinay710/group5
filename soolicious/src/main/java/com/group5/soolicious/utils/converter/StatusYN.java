package com.group5.soolicious.utils.converter;

public enum StatusYN {
    YES('Y'), NO('N');

    private Character value;

    StatusYN(Character value) {
        this.value = value;
    }

    public Character getValue() {
        return value;
    }
}
