import {
  Button,
  GlassEffectContainer,
  Host,
  HStack,
  Image,
  Namespace,
  useNativeState,
  VStack,
  withAnimation,
} from '@expo/ui/swift-ui'
import {
  Animation,
  animation,
  buttonStyle,
  contentTransition,
  frame,
  glassEffect,
  glassEffectId,
  offset,
  opacity,
  symbolEffect,
  zIndex,
} from '@expo/ui/swift-ui/modifiers'
import { useId, useState } from 'react'

const ICONS = [
  { id: 'eraser', systemName: 'eraser.fill' },
  { id: 'lasso', systemName: 'lasso' },
] as const

export default function HomeScreen() {
  const [isExpanded, setIsExpanded] = useState(false)
  const namespaceId = useId()
  const bounceTrigger = useNativeState(0)

  const toggle = () => {
    withAnimation(Animation.spring(), () => {
      'worklet'
      bounceTrigger.value += 1
    })
    setIsExpanded(prev => !prev)
  }

  return (
    <Host
      style={{ flex: 1, backgroundColor: '#0B0D10' }}
      ignoreSafeArea='all'
    >
      <VStack spacing={48}>
        <Namespace id={namespaceId}>
          <GlassEffectContainer spacing={40}>
            <HStack
              spacing={40}
              modifiers={[
                offset({ x: isExpanded ? 0 : 120 }),
                animation(Animation.spring(), isExpanded ? 1 : 0),
              ]}
            >
              <Button
                onPress={toggle}
                modifiers={[
                  buttonStyle('plain'),
                  frame({ width: 80, height: 80 }),
                  glassEffect({
                    glass: {
                      variant: 'regular',
                      tint: '#FF950040',
                    },
                    shape: 'circle',
                  }),
                  glassEffectId('pencil', namespaceId),
                  zIndex(1),
                  animation(Animation.spring(), isExpanded ? 1 : 0),
                ]}
              >
                <Image
                  systemName={isExpanded ? 'scribble.variable' : 'plus'}
                  size={36}
                  modifiers={[
                    contentTransition('interpolate'),
                    symbolEffect(
                      { effect: 'bounce', direction: 'up' },
                      { value: bounceTrigger },
                    ),
                  ]}
                />
              </Button>

              {ICONS.map((icon, index) => (
                <Image
                  key={icon.id}
                  systemName={icon.systemName}
                  size={36}
                  modifiers={[
                    frame({ width: 80, height: 80 }),
                    opacity(isExpanded ? 1 : 0),
                    glassEffect({
                      glass: { variant: 'regular' },
                      shape: 'circle',
                    }),
                    glassEffectId(icon.id, namespaceId),
                    offset({ x: isExpanded ? 0 : -120 * (index + 1) }),
                    animation(
                      Animation.spring(),
                      isExpanded,
                    ),
                  ]}
                />
              ))}
            </HStack>
          </GlassEffectContainer>
        </Namespace>

        <Button
          label='Toggle'
          onPress={toggle}
          modifiers={[buttonStyle('glass')]}
        />
      </VStack>
    </Host>
  )
}
