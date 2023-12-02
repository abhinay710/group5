package com.group5.soolicious.utils.converter;

import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


@Converter(autoApply = true)
public class StatusYNConverter implements AttributeConverter<StatusYN, Character> {
    @Override
    public Character convertToDatabaseColumn(StatusYN status) {
        if (status == null) {
            return null;
        }
        return status.getValue();
    }

    @Override
    public StatusYN convertToEntityAttribute(Character status) {
        if (status == null) {
            return null;
        }

        return Stream.of(StatusYN.values())
                .filter(c -> c.getValue().equals(status))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}